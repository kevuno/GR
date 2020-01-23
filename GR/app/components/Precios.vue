<template lang="html">
    <Page>
        <ActionBar>
            <Label text="Browse"></Label>
        </ActionBar>

        <GridLayout class="page__content">
            <Label class="page__content-icon far" text.decode="&#xf1ea;"></Label>
            <Label class="page__content-placeholder" :text="message"></Label>
            <Button text="Tap sadkjansibadiabidaj!" @tap="onTap($event)"></Button>
            <TextView editable="false">
                <FormattedString>
                    <Span text="You can use text attributes such as " />
                    <Span text="bold, " fontWeight="Bold" />
                    <Span text="italic " fontStyle="Italic" />
                    <Span :text="message" />
                    <Span text="underline." textDecoration="Underline" />
                </FormattedString>
            </TextView>
        </GridLayout>
    </Page>
</template>

<script>
export default {
    data: () => {
        return {
            message: "Informacion de los precios"
        };
    }
}

import {request} from 'http';


</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

</style>