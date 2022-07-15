'use strict'
const sequelize = require('sequelize');
const db = require('../models/index');

async function populars(req, res) {
    const Op = require("sequelize");
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);

    if (!(!Number.isNaN(page) && page > 0)) {
        page = 1;
    }
    if (!(!Number.isNaN(size) && size > 0)) {
        size = 10;
    }

    var condition = {};
    if (req.query.popularity)
        condition.popularity = req.query.popularity;
    if (req.query.release_date)
        condition.release_date = req.query.release_date;
    if (req.query.adult)
        condition.adult = req.query.adult == 'true' ? true : false;
    if (req.query.original_title)
        condition.original_title = { [Op.substring]: req.query.original_title };
    console.log("condition: ", condition);
    const movies = await db.Movie.findAndCountAll({
        limit: size,
        offset: (page - 1) * size,
        where: condition
    });

    let nextPage = "";
    let previewPage = "";
    //Build search string
    let searchString = "";
    if (req.query.popularity)
        searchString += "popularity=" + req.query.popularity;
    if (req.query.release_date) {
        searchString += searchString.length > 0 ? "&" : ""
        searchString += "release_date=" + req.query.release_date;
    }
    if (req.query.adult) {
        searchString += searchString.length > 0 ? "&" : ""
        searchString += "adult=" + req.query.adult;
    }
    if (req.query.original_title) {
        searchString += searchString.length > 0 ? "&" : ""
        searchString += "original_title=" + req.query.original_title;
    }
    if (page < (movies.count / size)) {
        nextPage = searchString + (searchString.length > 0 ? "&" : "")
        nextPage += "page=" + (page + 1);
        nextPage = req.protocol + "://" + req.get('host') + req.baseUrl + "/populars?" + nextPage + "&size=" + size;
    }
    if (page > 1 && movies.count > 0) {
        previewPage = searchString + (searchString.length > 0 ? "&" : "")
        previewPage += "page=" + (page > Math.ceil(movies.count / size) ? Math.ceil(movies.count / size) : page - 1);
        previewPage = req.protocol + "://" + req.get('host') + req.baseUrl + "/populars?" + previewPage + "&size=" + size;
    }

    //Return the response
    res.status(200).send({
        total: movies.count,
        total_pages: Math.ceil(movies.count / size),
        next_link: nextPage,
        previous_link: previewPage,
        page: page,
        per_page: size,
        results: movies.rows
    });
}

module.exports = {
    populars
};
