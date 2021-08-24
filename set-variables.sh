#!/bin/bash
rm build/*.js.map
rm build/static/js/*.map
rm build/static/css/*.map
source .env
sed -i "s~NAME~$REACT_APP_NAME~g" build/index.html
sed -i "s~DESCRIPTION~$REACT_APP_DESCRIPTION~g" build/index.html
sed -i "s~KEYWORDS~$REACT_APP_KEYWORDS~g" build/index.html
sed -i "s~DESKTOP_VIEWPORT~$REACT_APP_DESKTOP_VIEWPORT~g" build/index.html
sed -i "s~PRECONNECT~$REACT_APP_REST_URL~g" build/index.html
sed -i "s~HEADER_HEIGHT~$REACT_APP_HEADER_HEIGHT~g" build/index.html
sed -i "s~NAV_HEIGHT~$REACT_APP_NAV_HEIGHT~g" build/index.html
sed -i "s~BTN_INPUT_HEIGHT~$REACT_APP_BTN_INPUT_HEIGHT~g" build/index.html
sed -i "s~MOBILE_FIRST_GRID_PADDING~$REACT_APP_MOBILE_FIRST_GRID_PADDING~g" build/index.html
sed -i "s~MOBILE_FIRST_SOLID_PADDING~$REACT_APP_MOBILE_FIRST_SOLID_PADDING~g" build/index.html
sed -i "s~MOBILE_SECOND_GRID_PADDING~$REACT_APP_MOBILE_SECOND_GRID_PADDING~g" build/index.html
sed -i "s~MOBILE_SECOND_SOLID_PADDING~$REACT_APP_MOBILE_SECOND_SOLID_PADDING~g" build/index.html
sed -i "s~FIRST_LINE_HEIGHT~$REACT_APP_FIRST_LINE_HEIGHT~g" build/index.html
sed -i "s~HEADER_Z_INDEX~$REACT_APP_HEADER_Z_INDEX~g" build/index.html
sed -i "s~MODAL_Z_INDEX~$REACT_APP_MODAL_Z_INDEX~g" build/index.html
sed -i "s~DEFAULT_Z_INDEX~$REACT_APP_DEFAULT_Z_INDEX~g" build/index.html
sed -i "s~TOAST_SUCCESS_BG~$REACT_APP_TOAST_SUCCESS_BG~g" build/index.html
sed -i "s~TOAST_INFO_BG~$REACT_APP_TOAST_INFO_BG~g" build/index.html
sed -i "s~TOAST_FAIL_BG~$REACT_APP_TOAST_FAIL_BG~g" build/index.html
sed -i "s~TOAST_FAIL_TEXT~$REACT_APP_TOAST_FAIL_TEXT~g" build/index.html
sed -i "s~FIRST_COLOR~$REACT_APP_FIRST_COLOR~g" build/index.html
sed -i "s~SECOND_COLOR~$REACT_APP_SECOND_COLOR~g" build/index.html
sed -i "s~FIRST_SUB_COLOR~$REACT_APP_FIRST_SUB_COLOR~g" build/index.html
sed -i "s~SECOND_SUB_COLOR~$REACT_APP_SECOND_SUB_COLOR~g" build/index.html
sed -i "s~THIRD_SUB_COLOR~$REACT_APP_THIRD_SUB_COLOR~g" build/index.html
sed -i "s~FORTH_SUB_COLOR~$REACT_APP_FORTH_SUB_COLOR~g" build/index.html
sed -i "s~DISABLE_BG_COLOR~$REACT_APP_DISABLE_BG_COLOR~g" build/index.html
sed -i "s~DISABLE_TEXT_COLOR~$REACT_APP_DISABLE_TEXT_COLOR~g" build/index.html
sed -i "s~LINK_COLOR~$REACT_APP_LINK_COLOR~g" build/index.html
sed -i "s~FIRST_BACKGROUND_COLOR~$REACT_APP_FIRST_BACKGROUND_COLOR~g" build/index.html
sed -i "s~SECOND_BACKGROUND_COLOR~$REACT_APP_SECOND_BACKGROUND_COLOR~g" build/index.html
sed -i "s~FIRST_MODAL_BACKGROUND_COLOR~$REACT_APP_FIRST_MODAL_BACKGROUND_COLOR~g" build/index.html
sed -i "s~SECOND_MODAL_BACKGROUND_COLOR~$REACT_APP_SECOND_MODAL_BACKGROUND_COLOR~g" build/index.html
sed -i "s~THIRD_MODAL_BACKGROUND_COLOR~$REACT_APP_THIRD_MODAL_BACKGROUND_COLOR~g" build/index.html
sed -i "s~SOLID_LIGHT~$REACT_APP_SOLID_LIGHT~g" build/index.html
sed -i "s~SOLID_DARK~$REACT_APP_SOLID_DARK~g" build/index.html
sed -i "s~FIRST_TEXT_COLOR~$REACT_APP_FIRST_TEXT_COLOR~g" build/index.html
sed -i "s~SECOND_TEXT_COLOR~$REACT_APP_SECOND_TEXT_COLOR~g" build/index.html
sed -i "s~THIRD_TEXT_COLOR~$REACT_APP_THIRD_TEXT_COLOR~g" build/index.html
sed -i "s~FIRST_BORDER_COLOR~$REACT_APP_FIRST_BORDER_COLOR~g" build/index.html
sed -i "s~FIRST_SHADOW~$REACT_APP_FIRST_SHADOW~g" build/index.html
sed -i "s~SECOND_SHADOW~$REACT_APP_SECOND_SHADOW~g" build/index.html
sed -i "s~FIRST_RADIUS~$REACT_APP_FIRST_RADIUS~g" build/index.html
sed -i "s~SECOND_RADIUS~$REACT_APP_SECOND_RADIUS~g" build/index.html
sed -i "s~THIRD_RADIUS~$REACT_APP_THIRD_RADIUS~g" build/index.html
sed -i "s~MATERIAL_COLOR~$REACT_APP_MATERIAL_COLOR~g" build/index.html
sed -i "s~DAMN_FONT~$REACT_APP_DAMN_FONT~g" build/index.html
sed -i "s~TINY_FONT~$REACT_APP_TINY_FONT~g" build/index.html
sed -i "s~SMALL_FONT~$REACT_APP_SMALL_FONT~g" build/index.html
sed -i "s~REGULAR_FONT~$REACT_APP_REGULAR_FONT~g" build/index.html
sed -i "s~TITLE_FONT~$REACT_APP_TITLE_FONT~g" build/index.html
sed -i "s~LARGE_FONT~$REACT_APP_LARGE_FONT~g" build/index.html
sed -i "s~BIG_FONT~$REACT_APP_BIG_FONT~g" build/index.html
sed -i "s~HUGE_FONT~$REACT_APP_HUGE_FONT~g" build/index.html
sed -i "s~NAME~$REACT_APP_NAME~g" build/manifest.json
sed -i "s~DESCRIPTION~$REACT_APP_DESCRIPTION~g" build/manifest.json
sed -i "s~FIRST_BACKGROUND_COLOR~$REACT_APP_FIRST_BACKGROUND_COLOR~g" build/manifest.json
#curl -X DELETE -H "Accept:application/json" -H "Authorization: $REACT_APP_ARVAN_KEY" -H "Accept-Language:fa" "https://napi.arvancloud.com/cdn/4.0/domains/$REACT_APP_MAIN_URL/caching?purge=all" -I
echo "VARIABLES SET SUCCESSFULLY"