/**
 * Planet Data Access Object
 */
export interface PlanetDao {
  id: number;
  name: string;
  description: string;
  image: string;
  radius: number;
  color: string;
  orbitRadius: number;
}
