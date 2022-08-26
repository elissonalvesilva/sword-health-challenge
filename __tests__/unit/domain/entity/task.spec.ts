import { faker } from '@faker-js/faker';
import { MAX_LENGTH_RESUME, TaskEntity } from '@/tasks/domain/entity';

describe('Task Entity', () => {
  it('should return false when resume length is greater than 2500', () => {
    const resume =
      faker.datatype.string(MAX_LENGTH_RESUME) +
      faker.datatype.string(MAX_LENGTH_RESUME);
    const [task, created] = new TaskEntity().create(resume, 'user-id');
    expect(created).toBeFalsy();
    expect(task).toBeNull();
  });

  it('should return false when resume length is greater than 2500', () => {
    const resume = faker.datatype.string(MAX_LENGTH_RESUME);
    const [task, created] = new TaskEntity().create(resume, 'user-id');
    expect(created).toBeTruthy();
    expect(task.resume).toEqual(resume);
  });
});
