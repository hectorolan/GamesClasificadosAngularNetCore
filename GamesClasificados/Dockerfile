#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/core/sdk:2.1-stretch AS build
WORKDIR /src
COPY ["GamesClasificados/GamesClasificados.csproj", "GamesClasificados/"]
RUN dotnet restore "GamesClasificados/GamesClasificados.csproj"
COPY . .
WORKDIR "/src/GamesClasificados"
RUN dotnet build "GamesClasificados.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GamesClasificados.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GamesClasificados.dll"]