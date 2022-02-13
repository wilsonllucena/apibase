export interface Repository {
  create(createDto: any): Promise<any>;
  findAll(): Promise<any>;
  findOne(id: string): Promise<any>;
  update(id: string, updateDto: any): Promise<any>;
  remove(id: string): Promise<any>;
}
