//models/PasienModelMysql.js
const QUERY = {
  SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created_at DESC LIMIT 100',
  SELECT_PATIENT: 'SELECT * FROM patients WHERE id = ?',
  CREATE_PATIENT: 'INSERT INTO patients(nama, alamat) VALUES (?, ?)',
  UPDATE_PATIENT: 'UPDATE patients SET nama = ?, alamat = ?, aktif = ? WHERE id = ?',
  //UPDATE_PATIENT: `UPDATE patients SET nama = ?, alamat = ? WHERE id = ?`,
  DELETE_PATIENT: 'DELETE FROM patients WHERE id = ?',
  CREATE_PATIENT_PROCEDURE: 'CALL create_and_return(?, ?)',
  AKTIF_PATIENT: 'SELECT * FROM patients WHERE aktif = 1',
  CARI_PATIENT: 'SELECT * FROM patients WHERE alamat = ?',
};

export default QUERY;