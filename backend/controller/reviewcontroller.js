    const ReviewModel = require('../model/reviewmodel');

    class reviewcontroller {
        async create(reviewData) {  
            try {
                const newrating = await ReviewModel.create({
                    movie_id: reviewData.movie_id, 
                    name: reviewData.name,
                    rating: reviewData.rating,
                    comment: reviewData.comments,
                });
                return newrating;
            } catch (error) {
                console.error('Error creating Review:', error);
                throw error;
            }
        }
        

    async getrating() {
        try {
            const reviews = await ReviewModel.find(); 
            return reviews; 
        } catch (error) {
            console.log('Error retrieving Review:', error);
            throw error; 
        }
    }

    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const delitem = await ReviewModel.findById(id); 
                if (!delitem) {
                    return reject({
                        msg: "Review not found",
                        status: 0
                    });
                }
                await delitem.deleteOne();
                return resolve({
                    msg: "Review deleted",
                    status: 1
                });
            } catch (error) {
                console.error('Error deleting Review:', error); 
                return reject({
                    msg: "Internal server error",
                    status: 0
                });
            }
        });
    }
    
    async update(id, ReviewData) {
        try {
            const updatedReview = await ReviewModel.findByIdAndUpdate(id, ReviewData, { new: true, runValidators: true });
            if (!updatedReview) {
                throw new Error('Review not found');
            }
            return updatedReview;
        } catch (error) {
            console.error('Error updating Review:', error);
            throw error; 
        }
    }
    
    
    
    }

    module.exports = reviewcontroller;
