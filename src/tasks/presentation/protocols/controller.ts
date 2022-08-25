import { HttpResponse } from '@/tasks/presentation/protocols';

export interface Controller<T = any> {
  handle(request: T): Promise<HttpResponse>;
}
