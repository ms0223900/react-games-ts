<?php
    if(is_array($_FILES)) {
        if(is_uploaded_file($_FILES['upFile']['tmp_name'])) {
            $sourcePath = $_FILES['upFile']['tmp_name'];
            $targetPath = "../images/".$_FILES['upFile']['name'];
        if(move_uploaded_file($sourcePath,$targetPath)) {
?>
            <img src="/<?php echo $targetPath; ?>" alt/>
<?php
            }
        }
    }
?>