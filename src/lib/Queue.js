import Queue from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queues {
  constructor() {
    this.queues = {};

    this.init();
  }

  /**
   * Inititializing Queues
   */

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Queue(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * Adding a new jobs to queues
   */

  add(queue, job) {
    // 'job' refers to handle function's parameters
    return this.queues[queue].bee.createJob(job).save();
  }

  /**
   * Processing queues
   */

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queues();
