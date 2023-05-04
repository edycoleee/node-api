//SQL SERVER CONFIG
const config = {
  server: '103.151.155.59',  //update me
  //server: 'localhost',  //update me
  authentication: {
    type: 'default',
    options: {
      userName: 'sa', //update me
      password: 'super-password1'  //update me
    }
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: false,
    trustServerCertificate: true,
    port: 1433,
    database: 'hospital'  //update me
  }
};

export default config