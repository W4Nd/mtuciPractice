const headhunterService = require('../third_party_api/hh');
const vacancySchema = require('../database_connections/schemas/vacancy');
const Fuse = require('fuse.js');

class VacanciesController {
    constructor() {
        this.getVacancies = this.getVacancies.bind(this);
        this.getAllVacancies = this.getAllVacancies.bind(this);
    }

    async handleRequest(req, res, callback) {
        try {
            const response = await callback();
            res.json(response);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getVacancies(req, res) {
        const filters = req.query;

        if (!filters.name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const callback = async () => {
            const data = await headhunterService.getVacancies(
                filters.name,
                50,
                filters.page,
                filters.salary,
                filters.currency,
                filters.area,
                filters.employment,
                filters.experience,
                filters.schedule
            );
            const operations = data.vacancies.map((vacancy) => ({
                updateOne: {
                    filter: { id: vacancy.id },
                    update: { $set: vacancy },
                    upsert: true,
                },
            }));
            await vacancySchema.bulkWrite(operations);

            return data;
        };

        this.handleRequest(req, res, callback);
    }

    async getAllVacancies(req, res) {
        const callback = async () => {
            const page = parseInt(req.query.page) || 0;
            const limit = 50;
            const skip = page * limit;
            const totalVacancies = await vacancySchema.countDocuments();
            const totalPages = Math.ceil(totalVacancies / limit - 1);
            const vacancies = await vacancySchema
                .find({})
                .skip(skip)
                .limit(limit);

            return {
                info: {
                    page,
                    totalPages,
                    totalVacancies,
                },
                vacancies,
            };
        };

        this.handleRequest(req, res, callback);
    }
}

module.exports = new VacanciesController();
