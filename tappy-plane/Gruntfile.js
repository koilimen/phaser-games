const webpackConfig = require('./webpack.config');

module.exports = function (grunt) {
    grunt.initConfig({
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({watch: true}, webpackConfig)
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/', src: ['*', 'assets/**/*'], dest: 'public/'},
                ],
            },
        },
        clean: ['public/']

    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask("default", ['clean', 'copy', 'webpack']);

};