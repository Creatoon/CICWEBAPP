const path = require('path');

const Section = require('./../models/sectionPagesModel');
const Releases = require('./../models/sectionReleasesModel');
const Blog = require('./../models/blogsModel');
const Landing = require('./../models/landingPageModel');
const Office = require('./../models/officeModel');
const Director = require('./../models/directorModel');

exports.getOverview = async (req, res, next) => {
  // 1) Get tour data from collection
  const sections = await Section.find();
  const releases = await Releases.find();
  const landing = await Landing.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'Overview',
    loc: {
      sections,
      releases,
      landing
    }
  });
};

exports.getBlogsOverview = async (req, res, next) => {
  const blogs = await Blog.find().sort('-date');

  res.status(200).render('blogsOverview', {
    title: 'Blogs',
    blogs
  });
};

exports.getBlogSingle = async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  res.status(200).render('blogAlone', {
    title: 'Blog',
    blog
  });
};

exports.getLogin = async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login'
  });
};

exports.getSignup = async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Signup'
  });
};

exports.getLocation = async (req, res, next) => {
  const off = await Office.find();

  const office = off[0];

  res.status(200).render('map', {
    title: 'Location',
    office
  });
};

exports.getMusic = async (req, res, next) => {
  res.status(200).render('musicNormal', {
    title: 'Music'
  });
};

exports.getMusicBhojpuri = async (req, res, next) => {
  res.status(200).render('musicBhojpuri', {
    title: 'Music'
  });
};

exports.getMusicGhazals = async (req, res, next) => {
  res.status(200).render('musicGhazal', {
    title: 'Music'
  });
};

exports.getMusicKaraoke = async (req, res, next) => {
  res.status(200).render('musicKaraoke', {
    title: 'Music'
  });
};

exports.getMusicDevotional = async (req, res, next) => {
  res.status(200).render('musicDevotional', {
    title: 'Music'
  });
};

exports.getDirectors = async (req, res, next) => {
  const directors = await Director.find();

  res.status(200).render('directors', {
    title: 'Board Of Directors',
    directors
  });
};

exports.getAsk = async (req, res, next) => {
  res.status(200).render('ask', {
    title: 'Ask Here'
  });
};

exports.getForgotPassword = async (req, res, next) => {
  res.status(200).render('forgotPassword', {
    title: 'Reset Password'
  });
};

exports.getForgotPasswordPage = async (req, res, next) => {
  res.status(200).render('forgot', {
    title: 'Forgot Password'
  });
};

exports.getPrivacyPolicy = async (req, res, next) => {
  res.status(200).render('privacyPolicy', {
    title: 'Privacy Policy'
  });
};

exports.getTerms = async (req, res, next) => {
  res.status(200).render('terms', {
    title: 'Terms & Conditions'
  });
};

exports.contactUs = async (req, res, next) => {
  res.status(200).render('contactUs', {
    title: 'Contact Us'
  });
};

exports.refund = async (req, res, next) => {
  res.status(200).render('refund', {
    title: 'Refunds Policy'
  });
};

// exports.loadTester = async(req,res,next)=> {

//   const options = {
//     root: '/'
//   }
  
//   res.sendFile('loaderio-7bf72309a698a873a411af93a9c00dbe.txt', options, function (err) {
//     if (err) {
//       next(err)
//     } else {
//       console.log('Sent:', fileName)
//     }
//   })
//   };



