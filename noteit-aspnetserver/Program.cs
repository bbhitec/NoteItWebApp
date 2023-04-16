using Microsoft.OpenApi.Models;
using noteit_aspnetserver.Data;
using Swashbuckle.AspNetCore.SwaggerGen;

var builder = WebApplication.CreateBuilder(args);
const string version = "v1";
const string title = "NoteIt - ASP.NET React Web API";
const string endpoint_name = "Regular Web API endpoints for NoteIt";

// [demo] allow access to the ARI with a CORS policy
//        authorize azure side and a local test port
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://black-sky-0b2e82303.3.azurestaticapps.net");
        });
});

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc(version, new OpenApiInfo { Title = title, Version = version });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    // [bp] add swagger page modifications
    swaggerUIOptions.DocumentTitle = title;
    swaggerUIOptions.SwaggerEndpoint("/swagger/" + version + "/swagger.json", endpoint_name);
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");  // use the defined CORS policy



// [demo] assign repository endponits for the API routes
// [bp] these usually go to outer classes, but we are keeping this app small
app.MapGet("/get-all-notes", async () => await NotesRepository.GetNotesAsync())
    .WithTags("Read Endpoints");   // [demo] adding naming to the API list

app.MapGet("/get-note-by-id/{noteId}", async (int noteId) =>
{
    // get that note!
    Note noteToReturn = await NotesRepository.GetNoteByIdAsync(noteId);

    // check if we gots it...
    if (noteToReturn != null)
    {
        return Results.Ok(noteToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Read Endpoints");

app.MapPost("/create-note", async (Note noteToCreate) =>
{
    bool createOk = await NotesRepository.CreateNoteAsync(noteToCreate);

    if (createOk)
    {
        return Results.Ok("Create successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Write Endpoints");

app.MapPut("/update-note", async (Note noteToUpdate) =>
{
    bool updateOk = await NotesRepository.UpdateNoteAsync(noteToUpdate);

    if (updateOk)
    {
        return Results.Ok("Update successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Write Endpoints");

app.MapDelete("/delete-note_by-id/{noteId}", async (int noteId) =>
{
    bool deleteOk = await NotesRepository.DeleteNoteAsync(noteId);

    if (deleteOk)
    {
        return Results.Ok("Delete successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Write Endpoints");



app.Run();