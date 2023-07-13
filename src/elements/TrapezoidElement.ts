import {
  BarElement,
  CommonElementOptions,
  BarOptions,
  ScriptableAndArrayOptions,
  ChartType,
  CommonHoverOptions,
  ScriptableContext,
} from 'chart.js';

export interface TrapezoidElementOptions extends CommonElementOptions, Record<string, unknown> {
  /**
   * Width of the border
   * @default 0
   */
  borderWidth: number;
  /**
   * which side of the bar to shrink: top, right, middle, none
   * @default top
   */
  shrinkAnchor: 'middle' | 'top' | 'bottom' | 'none';
  /**
   * fraction (0-1) of the bar that shrinks shrink. 1 all of the bar, 0 none
   * @default 1
   */
  shrinkFraction: number;
}

export interface TrapezoidElementProps {
  x: number;
  y: number;
  width: number;
  height: number;
  base: number;
  horizontal: boolean;
}

function inBetween(v: number, min: number, max: number, delta = 10e-6) {
  return v >= Math.min(min, max) - delta && v <= Math.max(min, max) + delta;
}

function transpose(m: { horizontal: boolean; left: number; top: number; right: number; bottom: number }) {
  return {
    left: m.top,
    right: m.bottom,
    top: m.left,
    bottom: m.right,
    horizontal: !m.horizontal,
  };
}

// need to make it a bar element for proper data label support
export class TrapezoidElement extends BarElement {
  // <TrapezoidElementProps, TrapezoidElementOptions> implements VisualElement {
  static readonly id = 'trapezoid';

  /**
   * @hidden
   */
  declare options: BarOptions & TrapezoidElementOptions;

  /**
   * @hidden
   */
  static readonly defaults = /* #__PURE__ */ {
    ...BarElement.defaults,
    shrinkAnchor: 'top',
    shrinkFraction: 1,
  };

  /**
   * @hidden
   */
  static readonly defaultRoutes = /* #__PURE__ */ BarElement.defaultRoutes;

  /**
   * @hidden
   */
  align: 'left' | 'right' | 'center' = 'center';

  /**
   * @hidden
   */
  next: TrapezoidElement | undefined = undefined;

  /**
   * @hidden
   */
  previous: TrapezoidElement | undefined = undefined;

  private getBounds(useFinalPosition = false) {
    // x ... center not start
    const { x, y, base, width, height, horizontal } = this.getProps(
      ['x', 'y', 'base', 'width', 'height', 'horizontal'],
      useFinalPosition
    );
    if (horizontal) {
      const w = Math.abs(x - base);
      let left = base - (this.align !== 'left' ? w : 0);
      let right = base + (this.align !== 'right' ? w : 0);
      let half = height / 2;
      let top = y - half;
      let bottom = y + half;
      return { left, top, right, bottom, horizontal };
    } else {
      const h = Math.abs(y - base);
      let half = width / 2;
      let left = x - half;
      let right = x + half;
      let top = base - (this.align !== 'right' ? h : 0);
      let bottom = base + (this.align !== 'left' ? h : 0);
      return { left, top, right, bottom, horizontal };
    }
  }

  /**
   * @hidden
   */
  inRange(mouseX: number | null, mouseY: number | null, useFinalPosition: boolean) {
    const bb = this.getBounds(useFinalPosition);
    const inX = mouseX == null || inBetween(mouseX, bb.left, bb.right);
    const inY = mouseY == null || inBetween(mouseY, bb.top, bb.bottom);
    return inX && inY;
  }

  /**
   * @hidden
   */
  inXRange(mouseX: number, useFinalPosition: boolean) {
    return this.inRange(mouseX, null, useFinalPosition);
  }

  /**
   * @hidden
   */
  inYRange(mouseY: number, useFinalPosition: boolean) {
    return this.inRange(null, mouseY, useFinalPosition);
  }

  /**
   * @hidden
   */
  getCenterPoint(useFinalPosition: boolean) {
    const { x, y, base, horizontal } = this.getProps(['x', 'y', 'base', 'horizontal'], useFinalPosition);
    const r = {
      center: {
        x: horizontal ? base : x,
        y: horizontal ? y : base,
      },
      left: {
        x: horizontal ? (base + x) / 2 : x,
        y: horizontal ? y : (base + y) / 2,
      },
      right: {
        x: horizontal ? base - (x - base) / 2 : x,
        y: horizontal ? y : base - (y + base) / 2,
      },
    }[this.align];
    return r;
  }

  /**
   * @hidden
   */
  tooltipPosition(useFinalPosition: boolean): { x: number; y: number } {
    return this.getCenterPoint(useFinalPosition);
  }

  /**
   * @hidden
   */
  getRange(axis: string) {
    const { width, height } = this.getProps(['width', 'height']);
    // const factor;
    return axis === 'x' ? width : height;
  }

  private computeWayPoints(useFinalPosition = false): [number, number][] {
    let dir = this.options.shrinkAnchor;
    let shrinkFraction = Math.max(Math.min(this.options.shrinkFraction, 1), 0);

    if (shrinkFraction === 0) {
      dir = 'none';
      shrinkFraction = 1;
    }

    let bounds = this.getBounds(useFinalPosition);
    const hor = bounds.horizontal;
    let nextBounds = this.next && (dir === 'top' || dir === 'middle') ? this.next.getBounds(useFinalPosition) : bounds;
    let prevBounds =
      this.previous && (dir === 'bottom' || dir === 'middle') ? this.previous.getBounds(useFinalPosition) : bounds;

    if (!hor) {
      bounds = transpose(bounds);
      nextBounds = transpose(nextBounds);
      prevBounds = transpose(prevBounds);
    }

    const hi = Math.floor((bounds.bottom - bounds.top) * (1 - shrinkFraction));
    const hiRest = Math.floor((bounds.bottom - bounds.top - hi) / 2);

    const points: [number, number][] = [];
    const rPoints: [number, number][] = [];
    if (dir === 'none' || dir === 'top') {
      points.push([bounds.left, bounds.top], [bounds.right, bounds.top]);
    } else {
      let pFraction = 1;
      if (dir === 'middle') {
        const pHiRest = Math.floor((prevBounds.bottom - prevBounds.top) * shrinkFraction * 0.5);
        pFraction = hiRest / (pHiRest + hiRest);
      }
      points.push(
        [bounds.left + (prevBounds.left - bounds.left) * pFraction, bounds.top],
        [bounds.right + (prevBounds.right - bounds.right) * pFraction, bounds.top]
      );
    }

    if (dir === 'middle') {
      points.push([bounds.right, bounds.top + hiRest]);
      points.push([bounds.right, bounds.bottom - hiRest]);
      rPoints.push([bounds.left, bounds.top + hiRest]);
      rPoints.push([bounds.left, bounds.bottom - hiRest]);
    } else if (dir === 'top' && shrinkFraction < 1) {
      points.push([bounds.right, bounds.top + hi]);
      rPoints.push([bounds.left, bounds.top + hi]);
    } else if (dir === 'bottom' && shrinkFraction < 1) {
      points.push([bounds.right, bounds.bottom - hi]);
      rPoints.push([bounds.left, bounds.bottom - hi]);
    }

    if (dir === 'none' || dir === 'bottom') {
      points.push([bounds.right, bounds.bottom], [bounds.left, bounds.bottom]);
    } else {
      let nFraction = 1;
      if (dir === 'middle') {
        const nHiRest = Math.floor((nextBounds.bottom - nextBounds.top) * shrinkFraction * 0.5);
        nFraction = hiRest / (nHiRest + hiRest);
      }
      points.push(
        [bounds.right + (nextBounds.right - bounds.right) * nFraction, bounds.bottom],
        [bounds.left + (nextBounds.left - bounds.left) * nFraction, bounds.bottom]
      );
    }

    points.push(...rPoints.reverse());

    if (!hor) {
      return points.map(([x, y]) => [y, x]);
    }
    return points;
  }

  /**
   * @hidden
   */
  draw(ctx: CanvasRenderingContext2D): void {
    const { options } = this;
    ctx.save();
    ctx.beginPath();
    const points = this.computeWayPoints();
    ctx.moveTo(points[0][0], points[0][1]);
    for (const p of points.slice(1)) {
      ctx.lineTo(p[0], p[1]);
    }
    if (options.backgroundColor) {
      ctx.fillStyle = options.backgroundColor;
      ctx.fill();
    }
    if (options.borderColor) {
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth as number;
      ctx.stroke();
    }
    ctx.restore();
  }
}

declare module 'chart.js' {
  export interface ElementOptionsByType<TType extends ChartType> {
    trapezoid: ScriptableAndArrayOptions<TrapezoidElementOptions & CommonHoverOptions, ScriptableContext<TType>>;
  }
}
