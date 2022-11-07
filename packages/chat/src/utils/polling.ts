type JobType = (() => Promise<void>) | null
type JobListType = { id: string; job: JobType }[]

export class Polling {
  public interval: number

  private timeoutIds: number[] = []

  private latestJobs: JobListType = []

  private jobs: JobListType = []

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
    this.latestJobs = this.jobs
  }

  public stop() {
    this.clear()
    this.latestJobs = []
    this.jobs = []
  }

  public add(id: string, job: JobType) {
    const found = this.jobs.find((job) => job.id === id)
    if (found) {
      found.job = job
    } else {
      this.jobs.push({ id, job })
    }
  }

  public remove(id: string) {
    this.jobs = this.jobs.filter((job) => job.id !== id)
  }

  public async run(): Promise<void> {
    if (this.jobs.length) {
      for (const job of this.jobs) {
        if (job && job.job) {
          await job.job()
        }
      }

      this.clear()
    }

    await this.wait()

    await this.run()
  }

  public async resume(runImmediately = false): Promise<void> {
    if (!runImmediately) {
      await this.wait()
    }

    this.jobs = this.latestJobs

    await this.run()

    this.latestJobs = []
  }
}
