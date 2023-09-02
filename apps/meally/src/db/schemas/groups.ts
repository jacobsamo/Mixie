// import {
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
// import { users } from './auth';
// import { relations } from 'drizzle-orm';
// import { recipes } from './recipe';

// // teams are the groups of people who are working together on different recipes and also allow commenting and editing on recipes
// // teams are created by users and can be public or private
// // any recipe a user creates and adds to a team that they are apart of will be visible to all other members of that team
// // and will allow for anyone in that team to edit the recipe

// // generate the team schema

// export const groups = mysqlTable('groups', {
//   uid: serial('uid').primaryKey().notNull(),
//   id: text('id').notNull(),
//   name: text('name').notNull(),
//   description: text('description'),
//   isPublic: boolean('isPublic').notNull().default(false),
// });

// // generate the team members schema and this will extend the users model but add extra fields such as roles and permissions

// export const groupMembers = mysqlTable('groupMembers', {
//   uid: serial('uid').primaryKey().notNull(),
//   id: text('id').notNull(),
//   groupId: text('groupId').notNull(),
//   userId: text('userId').notNull(),
//   role: text('role').notNull(),
//   permissions: json('permissions'),
// });

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
