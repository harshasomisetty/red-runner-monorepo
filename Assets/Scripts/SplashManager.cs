using UnityEngine;
using DG.Tweening;

public class SplashManager : MonoBehaviour
{
    public RectTransform title;
    public Transform LogInPanel;

    public void StartTitle()
    {
        title.DOAnchorPos(Vector2.zero, 0.8f).SetDelay(0.4f).OnComplete(delegate {
            LogInPanel.DOScale(1f, 1).SetEase(Ease.OutBounce);
        });
        title.DOScale(new Vector3(0.4f, 0.4f, 0.4f), 0.8f).SetDelay(0.4f);
    }


    //    title.DOLocalJump(Vector3.zero, 150f, 6, 5, true).OnComplete(delegate
    //        {
    //            title.DOLocalRotate(Vector3.zero, 1, RotateMode.FastBeyond360).SetEase(Ease.OutBounce).OnComplete(delegate
    //            {
    //                titleAnim.enabled = true;
    //                GameShiftTitle.DOLocalMoveX(0, 1).SetEase(Ease.InOutFlash).SetDelay(0.5f).OnComplete(delegate
    //                {
    //                    SalvayTitle.DOLocalMoveX(0, 1).SetEase(Ease.InOutFlash).SetDelay(0.5f).OnComplete(delegate
    //                    {
    //                        titleAnim.enabled = true;
    //                        BG.DOLocalMoveX(2000, 1).SetEase(Ease.InOutFlash).SetDelay(2f).OnStart(delegate
    //                        {

    //                            BG.DOScale(0.8f, 1);

    //                        }).OnComplete(delegate
    //{
    //    LogInPanel.DOScale(1f, 1).SetEase((Ease)Ease.OutBounce);
    //    SplashCanvas.SetActive(false);
    //});
    //                    });
    //                });
    //            });
    //        });
}
