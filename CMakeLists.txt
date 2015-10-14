cmake_minimum_required(VERSION 2.8)

set(PROJECT "acm-icpc-notebook")
project(${PROJECT})

set(CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake/Modules")

set(JS_DIR ${CMAKE_CURRENT_SOURCE_DIR}/.js)
set(STYLES_DIR ${CMAKE_CURRENT_SOURCE_DIR}/.styles)
set(TEMPLATES_DIR ${CMAKE_CURRENT_SOURCE_DIR}/.templates)
set(RES_DIR ${CMAKE_CURRENT_SOURCE_DIR})

# Less
file(GLOB files "${STYLES_DIR}/*.less")
file(GLOB common "${STYLES_DIR}/common/*.less")
foreach(file ${files})
	string(REPLACE ${STYLES_DIR} ${RES_DIR} res ${file})
	string(REPLACE ".less" ".min.css" res ${res})
	list(APPEND RES ${res})
	add_custom_command(OUTPUT ${res} 
		DEPENDS ${file} ${common}
		COMMAND ${CMAKE_CURRENT_SOURCE_DIR}/.tools/less.sh ${file} ${res})
endforeach()

# Jade
file(GLOB files "${TEMPLATES_DIR}/views/*.jade")
foreach(file ${files})
	string(REPLACE ${TEMPLATES_DIR}/views ${RES_DIR} res ${file})
	string(REPLACE ".jade" ".html" res ${res})
	#TODO: Remove -P when finalized
	list(APPEND RES ${res})
	add_custom_command(OUTPUT ${res} 
		DEPENDS ${file}
		COMMAND jade -P -p ${TEMPLATES_DIR}/file < ${file} > ${res})
endforeach()

# Javascript
#TODO: Remove -b flag when finalized
set(UGFLAG "-b")
file(GLOB files "${JS_DIR}/*.js")
set(res ${RES_DIR}/main.min.js)
list(APPEND RES ${res})
add_custom_command(OUTPUT ${res} 
	DEPENDS ${files}
	COMMAND cat ${files} | uglifyjs ${UGFLAG} > ${res})

add_custom_target(resources ALL DEPENDS ${RES})
