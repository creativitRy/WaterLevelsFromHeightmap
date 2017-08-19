// script.name=WaterLevelsFromHeightmap - ctRy
// script.description=Sets the water levels based on the heightmap
//
// script.param.watermap.type=file
// script.param.watermap.description=Water heightmap
// script.param.watermap.displayName=Water heightmap
// script.param.watermap.optional=false
//
// script.param.bit.type=boolean
// script.param.bit.description=check for 16 bit images, uncheck for 8 bit images
// script.param.bit.displayName=16 bit heightmap
// script.param.bit.default=true
//
// script.param.coordx.type=integer
// script.param.coordx.description=how much should the mask be shifted in the x direction (top left corner)
// script.param.coordx.displayName=x shift
// script.param.coordx.default=0
//
// script.param.coordy.type=integer
// script.param.coordy.description=how much should the mask be shifted in the y direction (top left corner)
// script.param.coordy.displayName=y shift
// script.param.coordy.default=0
// script.hideCmdLineParams=true

///////////CODE/////////////

if (parseInt(org.pepsoft.worldpainter.Version.BUILD) <= 20160820173357)
    throw "Update WorldPainter!";

print('Script by ctRy');

var waterHeight = wp.getHeightMap().fromFile(params["watermap"].getAbsolutePath()).go();

var xMin = params["coordx"];
var yMin = params["coordy"];

var multiplier = 1; //8 bit
if (params["bit"])
	multiplier = 1.0 / 256.0; //16 bit

var extent = waterHeight.getExtent();

for (var x = extent.getX(); x < extent.getWidth(); x++)
{
    for (var y = extent.getY(); y < extent.getHeight(); y++)
    {
		if (!dimension.isTilePresent(truncate((x + xMin) / 128.0), truncate((y + yMin) / 128.0) ))
			continue;

		var height = Math.round(waterHeight.getHeight(x, y) * multiplier);
		dimension.setWaterLevelAt(x + xMin, y + yMin, height);
    }
}

print("Done! :D");

function truncate(number)
{
    return number > 0
         ? Math.floor(number)
         : Math.ceil(number);
}