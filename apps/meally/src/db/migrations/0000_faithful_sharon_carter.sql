CREATE TABLE `accounts` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`sessionToken` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp,
	`image` varchar(255));
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`uid` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`notes` text,
	`info` json,
	`ingredients` json,
	`steps` json,
	`keywords` json,
	`dietary` json,
	`allergens` json,
	`sweet_savoury` json,
	`mealTime` json,
	`version` int NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT '2023-07-03 09:26:32.703',
	`lastUpdated` datetime NOT NULL DEFAULT '2023-07-03 09:26:32.703',
	`lastUpdatedBy` text NOT NULL,
	`createdBy` text NOT NULL,
	`madeRecipe` int,
	`savedRecipe` int);
