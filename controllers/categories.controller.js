const {response, request}  = require('express');
const Category = require('../models/category');



const createCategory = async(req= request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});

    if(categoryDB){
        return res.status(400).json({
            msg:'Category is already created'
        });
    }
    
    const categoryData = {
        name, 
        user: req.user._id
    }

    const categorySaved = new Category(categoryData);
    await categorySaved.save();

    res.status(201).json({
        msg:'Category Created',
        categorySaved
    });
}

const getCategories = async(req = request, res=response ) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state:true};

    const [totalCategories, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
                .skip(from)
                .limit(limit)
      ]);


    res.status(200).json({
        msg:'getCategories',
        totalCategories,
        categories
    });
}

const getCategoriesById = (req = request, res = response) => {
    const id = req.params.id
    const idQuery = req.query.id;
    res.status(200).json({
        msg:'getCategories by Id',
        id,
        idQuery
    });
}

const updateCategories = (req = request, res = response) => {
    const id = req.params.id;
    res.status(200).json({
        msg:'Update Categories',
        id
    });

}


const deleteCategory = (req = request, res = response) => {
    const id =  req.params.id;

    res.status(200).json({
        msg:'delete cagetory',
        id
    });

}



module.exports = {createCategory, getCategories, getCategoriesById, updateCategories, deleteCategory};