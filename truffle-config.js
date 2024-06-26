module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",
      settings: {
        evmVersion: "london",
      },
    },
  },
  solidityLog: {
    displayPrefix: " :", // defaults to ""
    preventConsoleLogMigration: true, // defaults to false
  },
};
