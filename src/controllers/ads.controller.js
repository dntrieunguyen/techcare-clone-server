const getAllAds = async (req, res, next) => {
   try {
      console.log(req.session);
   } catch (error) {
      next(error);
   }
};

module.exports = {
   getAllAds,
};
