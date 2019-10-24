export class Entity {
  ENTITY_SEP = ':';
  PERM_SEP = '_';
  constructor(permission_repr) {
    const [entity, permissions] = permission_repr.split(this.ENTITY_SEP);
    this.string_repr = permission_repr;
    this.entity = entity;
    this.permissions = permissions.split(this.PERM_SEP)
  }

  // isEqualTo(p) {
  //   if (this.entity === p.entity){
  //     const pSet = new Set(p.permissions);
  //     return this.permissions.some(P => pSet.has(P))
  //   }
  //   return false;
  // }
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
export class Role {
  constructor({id, name, permissions}){
    this.id = id;
    this.name = name;
    this.entities = permissions.map(p => new Entity(p));
  }
  /**
   * @param entity -> permiso
   * @type Entity
   * */
  hasPerm(entity) {
    return this.entities.some(E => E.entity === entity.entity && E.permissions.some(p => entity.permissions.filter(P => p === P)))
  }
}