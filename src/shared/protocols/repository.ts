export interface Repository {
  create(createDto: any): any;
  findAll(): any;
  findOne(id: string): any;
  update(id: string, updateDto: any): any;
  remove(id: string): any;
}
