USE [gcladb]
GO
SET IDENTITY_INSERT [dbo].[Sections] ON 

INSERT [dbo].[Sections] ([ID], [Name]) VALUES (1, N'Games')
INSERT [dbo].[Sections] ([ID], [Name]) VALUES (2, N'Controllers')
INSERT [dbo].[Sections] ([ID], [Name]) VALUES (3, N'Cables, Networking & Accessories')
INSERT [dbo].[Sections] ([ID], [Name]) VALUES (4, N'Bundles & Consoles')
INSERT [dbo].[Sections] ([ID], [Name]) VALUES (5, N'Other')
SET IDENTITY_INSERT [dbo].[Sections] OFF
SET IDENTITY_INSERT [dbo].[SystemConsoles] ON 

INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (1, N'Play Station 4')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (2, N'Play Station 3')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (3, N'Play Station 2')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (4, N'PS Vita')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (5, N'Xbox One')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (6, N'Xbox 360')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (7, N'Wii U')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (8, N'Wii')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (9, N'Nintendo 3DS/2DS')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (10, N'Nintendo Switch')
INSERT [dbo].[SystemConsoles] ([ID], [Name]) VALUES (11, N'Other')
SET IDENTITY_INSERT [dbo].[SystemConsoles] OFF
