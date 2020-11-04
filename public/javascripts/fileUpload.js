FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )

FilePond.setOptions({
    stylePanelAspectRatio: 150/100,
    imageResizeTaretWidth: 100,
    imageResizeTaretHeight: 150
})

FilePond.parse(document.body);