export class Entity {
  static ENTITY_SEP = ':';
  static PERM_SEP = '_';
  constructor(permission_repr) {
    const [entity, permissions] = permission_repr.split(Entity.ENTITY_SEP);
    this.string_repr = permission_repr;
    this.entity = entity;
    this.permissions = permissions.split(Entity.PERM_SEP)
  }

  capitalize(value) {
    const lower = value.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  get capitalizedEntity() {
    return this.capitalize(this.entity)
  }
  get cantPerms() {
    return this.permissions.length
  }
}
class RoleEntity extends Entity{
  constructor(...params) {
    super(...params)
  }
  updStringRepr() {
    this.string_repr = `${this.entity}${Entity.ENTITY_SEP}${this.permissions.join(Entity.PERM_SEP)}`
  }
  removePerm(perm) {
    const permIndex = this.permissions.findIndex(p => p === perm);
    permIndex !== -1 && this.permissions.splice(permIndex, 1);
    this.updStringRepr();
  }
  addPerm(perm) {
    const permIndex = this.permissions.findIndex(p => p === perm);
    permIndex === -1 && this.permissions.push(perm);
    this.updStringRepr();
  }
  static buildRepr(entityName, ...perms) {
    return `${entityName}${Entity.ENTITY_SEP}${perms.join(Entity.PERM_SEP)}`
  }
}
export class Role {
  constructor({id, name, permissions}){
    this.id = id;
    this.name = name;
    this.entities = permissions.map(p => new RoleEntity(p));
  }
  /**
   * @param entity -> entity contains perms []
   * @type Entity
   * @param permToToggle -> specific perm to chg
   * @type String
   * */
  hasPerm(entity, permToToggle) {
    return this.entities.some(E => E.entity === entity.entity && E.permissions.some(p => p === permToToggle))
  }
  get amountPerms() {
    return this.entities.reduce((carr, curr) => carr + curr.permissions.length, 0)
  }
  addEntity(entity, perm) {
    this.entities.push(new RoleEntity(RoleEntity.buildRepr(entity.entity, perm)))
  }
  removePerm(e, permToToggle) {
    e.removePerm(permToToggle);
    if (!e.cantPerms) {
      const eIndex = this.entities.findIndex(E => E.entity === e.entity);
      eIndex !== -1 && this.entities.splice(eIndex, 1);
    }
  }
  togglePerm(entity, permToToggle, value) {
    const e = this.entities.find(E => E.entity === entity.entity);
    if (e)
      value ? e.addPerm(permToToggle) : this.removePerm(e, permToToggle);
    else
      this.addEntity(entity, permToToggle)
  }
  showRepr() {
    console.log("============================");
    console.log(this.name);
    console.log('----------------------------');
    console.log('id:', this.id)
    console.log('permissions:', this.entities.map(e => e.string_repr).join(', '))
  }
}