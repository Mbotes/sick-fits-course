const mutations = {
    createDog(parent, args, ctx, info) {
        global.dogs = global.dogs || [];
        
        //create a new dog
        const newDog = {name: args.name};
        global.dogs.push(newDog);
        return newDog;
    }
};

module.exports = mutations;
