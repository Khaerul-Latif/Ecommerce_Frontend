import MainSection from '@/components/user/main-section'
import React from 'react'
import  styles from '../index.module.css'
import ReviewProdukComp from '@/components/review-produk/insert'

const ReviewProduk = () => {
 return(
  <div className={styles.container}>
    <ReviewProdukComp/>
  </div>
 )
}

export default ReviewProduk