import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { CRUD } from '../interfaces/crud.interface';
import Pet from '../models/pet.model';
import { PetCreationAttributes } from './../interfaces/pet/pet.attributes';

class PetService implements CRUD {
  readonly PET_PICTURES_PATH = '/pet_pictures';

  async getAll(limit: number | undefined, offset: number | undefined) {
    return Pet.findAll({
      where: {},
      limit: limit && Number(limit),
      offset: offset && Number(offset),
    });
  }

  async getById(id: string) {
    return Pet.findOne({ where: { id } });
  }

  async create(resource: PetCreationAttributes) {
    const id = uuidv4();
    if (resource.picture) {
      resource.picture = this.writePicture(`${id}`, resource.picture);
    }
    await Pet.create({ ...resource, id });
    return id;
  }

  async update(record: Pet, resource: PetCreationAttributes) {
    if (resource.picture) {
      resource.picture = this.writePicture(`${record.get('id')}`, resource.picture);
    }
    return record.update({ ...resource });
  }

  async delete(record: Pet) {
    return record.destroy();
  }

  async deleteAll() {
    return Pet.destroy({ truncate: true });
  }

  /**
   * Escribe una archivo de tipo jpeg en el servidor
   * @param petId Id del Pet
   * @param pictureBase64 String del su imagen en codificada en base64
   * @returns El path de la imagen guardada en el servidor
   */
  private writePicture(petId: string, pictureBase64: string): string {
    const filename = `${petId}.jpeg`;
    const picturePath = `${this.PET_PICTURES_PATH}/${filename}`;
    // decode base64
    const bufferString = Buffer.from(pictureBase64, 'base64');
    // file put contents
    fs.writeFileSync(`public/${picturePath}`, bufferString);

    return picturePath;
  }
}

export default new PetService();
