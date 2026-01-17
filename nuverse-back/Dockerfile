# ==============================
# Build Stage
# ==============================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy everything
COPY . .

# Publish the WebAPI project
RUN dotnet publish "src/NuVerse.WebAPI/NuVerse.WebAPI.csproj" -c Release -o /app/publish

# ==============================
# Runtime Stage
# ==============================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

# Render gives PORT dynamically
ENV ASPNETCORE_URLS=http://0.0.0.0:$PORT

# Run the API
CMD ["dotnet", "NuVerse.WebAPI.dll"]
