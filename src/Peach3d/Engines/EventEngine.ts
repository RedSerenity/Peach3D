export class QuickEvent {
  private _Subscribers: Array<(...Args) => void> = [];

  public Subscribe(subscriber: (...Args) => void): void {
    if (!subscriber) throw new Error("Tried to add an invalid or empty subscriber.");

    this._Subscribers.push(subscriber);
  }

  public Unsubscribe(subscriber: (...Args) => void): void {
    const Index = this._Subscribers.indexOf(subscriber);
    if (Index === -1) throw Error("Subscriber could not be unsubscribed. It was not found in the list of subscribers.");

    this._Subscribers.splice(Index, 1);
  }

  public Trigger(sender: object, ...Args): void {
    if (!sender) sender = this;
    this._Subscribers.forEach((subscriber) => subscriber.apply(sender, Args));
  }
}