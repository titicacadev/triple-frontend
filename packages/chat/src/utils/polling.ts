type JobType = (() => Promise<void>) | null

export class Polling {
  public interval: number

  private timeoutIds: number[] = []

  private latestJob: JobType = null

  private job: JobType = null

  public constructor(interval = 1000) {
    this.interval = interval
  }

  private clear() {
    this.timeoutIds.forEach((id) => window.clearTimeout(id))
    this.timeoutIds = []
  }

  private async wait() {
    await new Promise((resolve) => {
      this.timeoutIds.push(window.setTimeout(resolve, this.interval))
    })
  }

  public pause() {
    this.clear()
    this.latestJob = this.job
  }

  public stop() {
    this.clear()
    this.latestJob = null
    this.job = null
  }

  public async run(job?: JobType): Promise<void> {
    if (job) {
      this.job = job
    }

    if (this.job) {
      await this.job()
      this.clear()
    }

    await this.wait()

    await this.run()
  }

  public async resume(runImmediately = false): Promise<void> {
    if (!runImmediately) {
      await this.wait()
    }

    await this.run(this.latestJob)

    this.latestJob = null
  }
}
