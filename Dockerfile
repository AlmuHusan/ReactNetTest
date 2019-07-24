FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build

RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs
RUN apt-get install -y mono-complete
RUN curl -sLo /usr/local/bin/nuget.exe https://dist.nuget.org/win-x86-commandline/latest/nuget.exe

WORKDIR /src
USER admin
COPY ["/sql-react-test.sln", ""]
COPY ["/sql-react-test/sql-react-test.csproj", "./sql-react-test/"]
COPY ["/sql-react-test.Core/sql-react-test.Core.csproj", "./sql-react-test.Core/"]
RUN nuget.exe restore "/sql-react-test.sln" -SolutionDirectory ../ -Verbosity normal
RUN dotnet restore "sql-react-test/sql-react-test.csproj"
RUN dotnet restore "sql-react-test.Core/sql-react-test.Core.csproj"


COPY . .

WORKDIR /src/sql-react-test
RUN dotnet build -c Release -o /app

WORKDIR /src/sql-react-test.Core
RUN dotnet build -c Release -o /app

WORKDIR /src/
FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "sql-react-test.dll"]