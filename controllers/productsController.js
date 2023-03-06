'use strict';
let controller = {};
const models = require('../models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

controller.getData = async (req, res, next) => {
    let categories = await models.Category.findAll({
        include: [{
            model: models.Product
        }]
    });
    res.locals.categories = categories;

    let brands = await models.Brand.findAll({
        include:[{
            model: models.Product
        }]
    });
    res.locals.brands = brands;
    
    let tags = await models.Tag.findAll();
    res.locals.tags = tags;

    next()
}
controller.show = async (req, res) => {
    let category = isNaN(req.query.category) ? 0: parseInt(req.query.category);
    let brand = isNaN(req.query.brand) ? 0: parseInt(req.query.brand);
    let tag = isNaN(req.query.tag) ? 0: parseInt(req.query.tag);
    let keyword = req.query.keyword || '';

    let options = {
        attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'oldPrice'],
        where: {}
    };
    if (category > 0){
        options.where.categoryId = category;
    }
    
    if(brand > 0){
        options.where.brandId = brand;
    }
    if(tag > 0){
        options.include =[{
            model: models.Tag,
            where: {id: tag}
        }];
    }
    if (keyword.trim() != ''){
        options.where.name = {
            [Op.iLike]: `%${keyword}%`
        }
    }
    let products = await models.Product.findAll(options);
    res.locals.products = products;
    res.render('product-list');
}

controller.showDetails = async (req, res) =>{
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);

    let product = await models.Product.findOne({
        attributes: ['id', 'name', 'stars', 'oldPrice', 'price', 'summary', 'description', 'specification'],
        where: {id},
        include: [{
            model: models.Image,
            attributes: ['name', 'imagePath']
        },
        {
            model: models.Review,
            attributes: ['id', 'review', 'stars']
        }]
    });
    res.locals.product = product;
    res.render('product-detail');
}

module.exports = controller;