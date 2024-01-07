// import  {
//   boolean,
//   datetime,
//   int,
//   json,
//   mysqlEnum,
//   mysqlTable,
//   serial,
//   text,
//   uniqueIndex,
//   varchar,
// } from 'drizzle-orm/mysql-core';
// import  { users } from './auth';
// import  { relations } from 'drizzle-orm';
// import  { recipes } from './recipe';

// // teams are the groups of people who are working together on different recipes and also allow commenting and editing on recipes
// // teams are created by users and can be public or private
// // any recipe a user creates and adds to a team that they are apart of will be visible to all other members of that team
// // and will allow for anyone in that team to edit the recipe

// // generate the team schema

// export const groups = mysqlTable("groups", {
//     uid: char("groupId", { length: 36 }).notNull(),
//     name: varchar("name", { length: 191 }).notNull(),
//     description: text("description"),
//     isPublic: boolean("isPublic").default(false).notNull(),
//     icon: text("icon"),
//     banner: text("banner"),
//     createdAt: timestamp("createdAt")
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//     owner: varchar("owner", { length: 191 }).notNull(),
// });

// // generate the team members schema and this will extend the users model but add extra fields such as roles and permissions

// export const groupUsers = mysqlTable("groups_users", {
//     userId: char("userId", { length: 36 }).primaryKey().notNull(),
//     groupId: char("groupId", { length: 36 }).notNull(),
//     role: mysqlEnum("role", ["admin", "member"]).default("member").notNull(),
//   });

// export const groupMembersRelation = relations(groups, ({ one }) => ({
//   groupMembers: one(groupMembers, {
//     fields: [groups.uid],
//     references: [groupMembers.groupId],
//   }),
// }));

// // this extends the current recipe model and adds extra fields such as comments and ratings
// export const groupRecipes = mysqlTable('groupRecipes', {
//   uid: serial('uid').primaryKey().notNull(),
//   id: text('id').notNull(),
//   teamId: text('teamId').notNull(),
//   recipeId: text('recipeId').notNull(),
//   comment: text('comment').notNull(),
//   rating: int('rating').notNull(),
// });

// // relate this table to the group table
// export const groupRecipesRelation = relations(groups, ({ one }) => ({
//   groupRecipes: one(groupRecipes, {
//     fields: [groups.uid],
//     references: [groupRecipes.teamId],
//   }),
// }));

// export const groupRecipesRelationToRecipe = relations(recipes, ({ one }) => ({
//   groupRecipes: one(groupRecipes, {
//     fields: [recipes.uid],
//     references: [groupRecipes.recipeId],
//   }),
// }));
