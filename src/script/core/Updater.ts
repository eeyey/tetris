class Updater<Subscriber extends Function = () => void> {
  pTimestamp: number;
  subscribers: Subscriber[] = [];
  subscribersRate: Map<Subscriber, number> = new Map();
  subscribersPTimestamp: Map<Subscriber, number> = new Map();

  constructor() {
    requestAnimationFrame((timestamp: number) => this.dispatch(timestamp));
  }

  subscribe(subscriber: Subscriber, rate: number = 0) {
    this.subscribers.push(subscriber);
    this.subscribersRate.set(subscriber, rate);
    this.subscribersPTimestamp.set(subscriber, 0);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index !== -1) {
        this.subscribersRate.delete(subscriber);
        this.subscribers.splice(index, 1);
      }
    };
  }

  dispatch(timestamp: number) {
    requestAnimationFrame((timestamp: number) => this.dispatch(timestamp));

    for (const subscriber of this.subscribers) {
      const rate = this.subscribersRate.get(subscriber);
      const pTimestamp = this.subscribersPTimestamp.get(subscriber);

      if (rate === undefined || pTimestamp === undefined) return;

      if (timestamp - pTimestamp > rate) {
        subscriber();
        this.subscribersPTimestamp.set(subscriber, timestamp);
      }
    }
  }
}

export default Updater;
