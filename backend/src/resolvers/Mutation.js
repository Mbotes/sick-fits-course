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
    },
    async deleteItem(parent, args, ctx, info){
        const where = { id: args.id }
        //find the item
        const item = await ctx.db.query.item({ where }, `{id title}`);
        // check if they own that item of have the permissions
        // TODO
        // delete it!
        return ctx.db.mutation.deleteItem({ where }, info);
    }
};

module.exports = Mutations;
