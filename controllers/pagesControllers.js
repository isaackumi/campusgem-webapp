const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
// const PageVisit = require('../models/pageVisitModel');

router.get('/',(req, res) => {
    res.render('index',{layout:false});
});

router.get('/about',(req, res) => {
    res.render('about',{layout:false});
});

router.get('/media-team',(req, res) => {
    res.render('media-team',{layout:false});
});

// router.get('/gallery',(req, res) => {
//     res.render('gallery',{layout:false});
// });

router.get('/gallery', async (req, res) => {
    try {
        const galleryPath = path.join(__dirname, '..', 'public', 'gallery');
        
        const images2018 = await fs.readdir(path.join(galleryPath, '2018'));
        const images2020 = await fs.readdir(path.join(galleryPath, '2020'));
        const images2021 = await fs.readdir(path.join(galleryPath, '2021'));
        const images2022 = await fs.readdir(path.join(galleryPath, '2022'));

        const sortImages = (images) => {
            return images.sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)[0]);
                const numB = parseInt(b.match(/\d+/)[0]);
                return numA - numB;
            });
        };

        const filterImages = (images) => {
            return images.filter(img => img.endsWith('.jpg') || img.endsWith('.jpeg'));
        };

        const images2018Sorted = sortImages(filterImages(images2018));
        const images2020Sorted = sortImages(filterImages(images2020));
        const images2021Sorted = sortImages(filterImages(images2021));
        const images2022Sorted = sortImages(filterImages(images2022));


        res.render('gallery', {
            layout: false,
            images2018: images2018Sorted,
            images2020: images2020Sorted,
            images2021: images2021Sorted,
            images2022: images2022Sorted
        });
    } catch (error) {
        console.error('Error reading gallery images:', error);
        res.status(500).send('Error loading gallery');
    }
});

router.get('/contact',(req, res) => {
    res.render('contact',{layout:false});
});


//  our senior pastor
router.get('/senior-pastor',(req, res) => {
    res.render('founding-father',{layout:false});
});

//  our vission and mission
router.get('/vision-mission',(req, res) => {
    res.render('vision-mission',{layout:false});
});

router.get('/core-values',(req, res) => {
    res.render('core-values',{layout:false});
});

router.get('/daily-confession',(req, res) => {
    res.render('daily-confession',{layout:false});
});





// router.get('/admin-login',(req, res) => {
//     res.render('signin',{layout:false});
// });

// router.get('/admin-register',(req, res) => {
//     res.render('signup',{layout:false});
// });





module.exports=router
