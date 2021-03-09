export default interface IAddressUserDTO {
  user_id: string;
  address: string;
  number: string;
  complement?: string;
  postal_code: string;
  city: string;
  state: string;
}
