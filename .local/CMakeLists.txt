cmake_minimum_required(VERSION 2.8)

set(PROJECT "local-web")
project(${PROJECT})

set(CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake/Modules")

set(SRC_DIR ${CMAKE_CURRENT_SOURCE_DIR}/src)
set(INC_DIR ${CMAKE_CURRENT_SOURCE_DIR}/include)
set(INCLUDE
	${INC_DIR}
)

set(INC
)

set(SRC
	${SRC_DIR}/main.cpp
)

set(LIB "")

# libwebsockets
include("${CMAKE_MODULE_PATH}/FetchLibWebSockets.cmake")
fetch_libwebsockets()
list(APPEND LIB ${LIBWEBSOCKETS_LIBRARIES} ssl crypto z)
list(APPEND INCLUDE ${LIBWEBSOCKETS_INCLUDE_DIR} ${LIBWEBSOCKETS_INCLUDE_DIR}/..)

include_directories(${INCLUDE})
add_executable(${PROJECT} ${SRC} ${INC})
set_target_properties(${PROJECT} PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_SOURCE_DIR}/bin)
set_target_properties(${PROJECT} PROPERTIES RUNTIME_OUTPUT_DIRECTORY_RELEASE ${PROJECT_SOURCE_DIR}/bin)
set_target_properties(${PROJECT} PROPERTIES RUNTIME_OUTPUT_DIRECTORY_DEBUG ${PROJECT_SOURCE_DIR}/bin)
target_link_libraries(${PROJECT} ${LIB})
