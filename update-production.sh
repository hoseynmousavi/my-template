#!/bin/bash
rm build/*.js.map && rm build/static/js/*.map && rm build/static/css/*.map && gzip -r build/static/js && gzip -r build/static/css &&
source .env &&
sed -i "s~NAME~$REACT_APP_NAME~g" build/index.html &&
sed -i "s~DESCRIPTION~$REACT_APP_DESCRIPTION~g" build/index.html &&
sed -i "s~KEYWORDS~$REACT_APP_KEYWORDS~g" build/index.html &&
sed -i "s~PRECONNECT~$REACT_APP_REST_URL~g" build/index.html &&
sed -i "s~FIRST_COLOR~$REACT_APP_FIRST_COLOR~g" build/index.html &&
sed -i "s~SECOND_COLOR~$REACT_APP_SECOND_COLOR~g" build/index.html &&
sed -i "s~THIRD_COLOR~$REACT_APP_THIRD_COLOR~g" build/index.html &&
sed -i "s~FORTH_COLOR~$REACT_APP_FORTH_COLOR~g" build/index.html &&
sed -i "s~BACKGROUND_COLOR~$REACT_APP_BACKGROUND_COLOR~g" build/index.html &&
sed -i "s~SECOND_BACKGROUND_COLOR~$REACT_APP_SECOND_BACKGROUND_COLOR~g" build/index.html &&
sed -i "s~THIRD_BACKGROUND_COLOR~$REACT_APP_THIRD_BACKGROUND_COLOR~g" build/index.html &&
sed -i "s~SOLID_LIGHT~$REACT_APP_SOLID_LIGHT~g" build/index.html &&
sed -i "s~SOLID_DARK~$REACT_APP_SOLID_DARK~g" build/index.html &&
sed -i "s~TEXT_COLOR~$REACT_APP_TEXT_COLOR~g" build/index.html &&
sed -i "s~BORDER_COLOR~$REACT_APP_BORDER_COLOR~g" build/index.html &&
sed -i "s~SECOND_BORDER_COLOR~$REACT_APP_SECOND_BORDER_COLOR~g" build/index.html &&
sed -i "s~MATERIAL_COLOR~$REACT_APP_MATERIAL_COLOR~g" build/index.html &&
sed -i "s~VERY_SMALL_FONT~$REACT_APP_VERY_SMALL_FONT~g" build/index.html &&
sed -i "s~SMALL_FONT~$REACT_APP_SMALL_FONT~g" build/index.html &&
sed -i "s~REGULAR_FONT~$REACT_APP_REGULAR_FONT~g" build/index.html &&
sed -i "s~TITLE_FONT~$REACT_APP_TITLE_FONT~g" build/index.html &&
sed -i "s~BIG_FONT~$REACT_APP_BIG_FONT~g" build/index.html &&
sed -i "s~VERY_BIG_FONT~$REACT_APP_VERY_BIG_FONT~g" build/index.html &&
sed -i "s~NAME~$REACT_APP_NAME~g" build/manifest.json &&
sed -i "s~DESCRIPTION~$REACT_APP_DESCRIPTION~g" build/manifest.json &&
sed -i "s~BACKGROUND_COLOR~$REACT_APP_BACKGROUND_COLOR~g" build/manifest.json &&
echo "SERVER UPDATED SUCCESSFULLY"
