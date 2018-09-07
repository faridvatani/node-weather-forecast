var fs = require('fs');

function view(templateName , values , response) {
    var fileContent = fs.readFileSync('./view/forcast/view/' + templateName + '.html' , {'encoding' : "utf8"});
    //mergeValues miyad value ha moon roo ba filecontent merge mikone
    //ma omadim valueee ke dar render.view("location", {"title" : "forecast Website"} , response); bood roo read kardim
    //va bad ba file ke mokhoonim ghatish kardim be kater hamin az tabee mergevalue estefadeh kardim
    fileContent = mergeValues(values , fileContent);

    response.write(fileContent);

}

function mergeValues(values , content) {
    //dar in section omadim on value ee ke dar {"title" : "forecast Website"} bood ro khondim va if ba <title>{{title}}</title>
    //barabar bood ono ba replace koon ba value in {"title" : "forecast Website"} ke mishe forcastwebsite replace kard
    for( var key in values) {
        content = content.replace("{{"+ key +"}}", values[key]);
    }

    return content;
}

module.exports.view = view;