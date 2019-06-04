const Mutations = {

    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info)

        console.log(item);

        return item
    },
    async updateItem(parent, args, ctx, info){
        const updates = {...args};
        //remove the ID from the updates
        delete updates.id;
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            },
        }, info);
    }
};

module.exports = Mutations;
