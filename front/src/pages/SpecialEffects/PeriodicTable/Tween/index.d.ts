export default class TWEEN{

  static removeAll(): void;
  static Easing: any;
  static update(): void;

  // static Tween(object: any): TWEEN;
  // static Tween = Tween;

  to(properties: any, duration?: number): TWEEN;
  easing(object: any): TWEEN;
  start(time?: string|number): TWEEN;
  stop(): TWEEN;
  end(): TWEEN;


}

declare class Tween {
  constructor(object: any);
}