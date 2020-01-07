load("@build_bazel_rules_postcss//:defs.bzl", "postcss_binary")

postcss_binary(
    name = "style_processed",
    src = "style.css",
    plugins = {
        "postcss-rename": "[{ renamingType: 'closure', outputRenamingMap: 'renaming_map.js' }]",
    },
    additional_outputs = ["renaming_map.js"],
    deps = [
        "@npm//postcss-rename",
    ],
)
