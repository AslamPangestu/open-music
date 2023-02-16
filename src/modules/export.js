const plugin = require('../api/export');
const model = require('../models/Export');
const Service = require('../services/ExportService');
const Repository = require('../repositories/ExportRepository/mq');

const ExportModule = () => {
  const repository = new Repository();
  const service = new Service(repository, model);

  return {
    plugin,
    options: { service, model },
  };
};

module.exports = ExportModule;
