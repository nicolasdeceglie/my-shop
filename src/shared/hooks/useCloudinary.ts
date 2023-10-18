export function useCloudinary() {
    function openWidget() {
        return new Promise<{img: string, tmb :string}>((resolve, reject) => {
            const uploadWidget = window.cloudinary.openUploadWidget(
                {
                    cloudName: 'dsnx85045',
                    uploadPreset: 'milrcn3d',
                    sources: ['camera', 'url', 'local']
                },
                function (error: any, result: any) {
                    if (!error && result.event === 'success') {
                        const img = result.info.url;
                        const tmb = result.info.thumbnail_url;
                        resolve({img, tmb})
                    }
                    console.log(result)
                }
            )
            uploadWidget.open();

        })
    }
    return{
        openWidget
    }
}